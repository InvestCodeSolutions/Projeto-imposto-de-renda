package com.declaraja.api.service;

import com.declaraja.api.dto.BemDTO;
import com.declaraja.api.dto.RelatorioPatrimonialDTO;
import com.declaraja.api.model.Bem;
import com.declaraja.api.model.Usuario;
import com.declaraja.api.repository.BemRepository;
import com.declaraja.api.repository.UsuarioRepository;
import java.awt.Color;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

@Service
public class RelatorioService {

    private final BemRepository bemRepository;
    private final AutorizacaoService autorizacaoService;
    private final UsuarioRepository usuarioRepository;

    public RelatorioService(BemRepository bemRepository, AutorizacaoService autorizacaoService, UsuarioRepository usuarioRepository) {
        this.bemRepository = bemRepository;
        this.autorizacaoService = autorizacaoService;
        this.usuarioRepository = usuarioRepository;
    }

    // ✅ Geração do Relatório Patrimonial (dados estruturados)
    public RelatorioPatrimonialDTO gerarRelatorioPatrimonial(Long usuarioId, String anoReferencia) {
        List<Bem> bens = bemRepository.findByUsuario_IdAndAnoReferencia(usuarioId, anoReferencia);

        BigDecimal total = bens.stream()
                .map(Bem::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        List<BemDTO> listaDeBensDTO = bens.stream()
                .map(bem -> new BemDTO(
                        bem.getId(),
                        bem.getDescricao(),
                        bem.getTipo(),
                        bem.getValor(),
                        bem.getAnoReferencia(),
                        bem.getUsuarioId()
                ))
                .collect(Collectors.toList());

        return new RelatorioPatrimonialDTO(
                usuarioId,
                anoReferencia,
                total,
                listaDeBensDTO
        );
    }

    // ✅ Geração do PDF
    public Resource gerarRelatorioPDF(Long clienteId, Integer ano) {
        Usuario usuario = usuarioRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + clienteId));

        List<Bem> bens;
        if (ano != null) {
            bens = bemRepository.findByUsuario_IdAndAnoReferencia(clienteId, String.valueOf(ano));
        } else {
            bens = bemRepository.findByUsuario_Id(clienteId);
        }

        try {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);

            document.open();

            // 🎯 Título
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Relatório de Bens do Cliente", titleFont);
            title.setAlignment(Paragraph.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" ")); // Espaço

            // 🎯 Dados do cliente
            document.add(new Paragraph("Cliente: " + usuario.getNome()));
            document.add(new Paragraph("ID: " + usuario.getId()));
            document.add(new Paragraph("Ano de Referência: " + (ano != null ? ano : "Todos")));
            document.add(new Paragraph("Data de emissão: " + LocalDate.now()));

            document.add(new Paragraph(" ")); // Espaço

            // 🎯 Conteúdo dos bens
            if (bens.isEmpty()) {
                document.add(new Paragraph("Nenhum bem encontrado para este cliente."));
            } else {
                PdfPTable table = new PdfPTable(5); // 5 colunas
                table.setWidthPercentage(100);
                table.setSpacingBefore(10f);
                table.setSpacingAfter(10f);

                // ✅ Cabeçalho da tabela
                adicionarCabecalhoTabela(table, "Nome");
                adicionarCabecalhoTabela(table, "Tipo");
                adicionarCabecalhoTabela(table, "Descrição");
                adicionarCabecalhoTabela(table, "Valor (R$)");
                adicionarCabecalhoTabela(table, "Ano Ref.");

                // ✅ Dados dos bens
                for (Bem bem : bens) {
                    table.addCell(bem.getNome());
                    table.addCell(bem.getTipo() != null ? bem.getTipo() : "N/A");
                    table.addCell(bem.getDescricao() != null ? bem.getDescricao() : "N/A");
                    table.addCell(String.format("%.2f", bem.getValor()));
                    table.addCell(bem.getAnoReferencia());
                }

                document.add(table);
            }

            document.close();

            byte[] pdfBytes = outputStream.toByteArray();
            return new ByteArrayResource(pdfBytes);

        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar o relatório PDF", e);
        }
    }

    // ✅ Cabeçalho formatado da tabela
    private void adicionarCabecalhoTabela(PdfPTable table, String titulo) {
        PdfPCell header = new PdfPCell();
        header.setBackgroundColor(Color.LIGHT_GRAY);
        header.setBorderWidth(1);
        header.setPhrase(new Phrase(titulo, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        table.addCell(header);
    }

    public Map<String, Object> obterDadosDashboard(Long usuarioId) {
        Map<String, Object> dashboard = new HashMap<>();

        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + usuarioId));

        List<Bem> bens = bemRepository.findByUsuario_Id(usuarioId);

        // Total de bens
        int totalBens = bens.size();

        // Valor total dos bens
        BigDecimal valorTotal = bens.stream()
                .map(Bem::getValor)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Ano mais recente com bens cadastrados
        int anoMaisRecente = bens.stream()
                .map(Bem::getAnoReferencia)
                .filter(anoRef -> {
                    try {
                        Integer.parseInt(anoRef);
                        return true;
                    } catch (Exception e) {
                        return false;
                    }
                })
                .mapToInt(Integer::parseInt)
                .max()
                .orElse(0);

        // Quantidade de tipos diferentes de bens
        Set<String> tiposDiferentes = bens.stream()
                .map(Bem::getTipo)
                .collect(Collectors.toSet());

        dashboard.put("usuario", usuario.getNome());
        dashboard.put("totalBens", totalBens);
        dashboard.put("valorTotalBens", valorTotal);
        dashboard.put("anoMaisRecente", anoMaisRecente);
        dashboard.put("quantidadeTiposBens", tiposDiferentes.size());

        return dashboard;
    }
}