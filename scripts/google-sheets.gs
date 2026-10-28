/**
 * Recebe o formulário de interesse do PGE e grava uma linha por envio na planilha.
 * Cole em Extensões > Apps Script da planilha e publique como App da Web
 * (Executar como: eu; Quem pode acessar: qualquer pessoa). O passo a passo está no README.
 */

var ABA = "Leads";

// Ordem das colunas na planilha; a primeira é preenchida com a data e hora do envio
var COLUNAS = [
  "recebido_em",
  "nome",
  "email",
  "telefone",
  "empresa",
  "cargo",
  "consentimento",
  "autoavaliacao",
  "origem",
  "pagina",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
];

// Campo invisível do formulário: só robôs preenchem
var ARMADILHA = "site";

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Robô recebe "ok" para não tentar de novo, mas nada é gravado
  if (p[ARMADILHA]) return responde({ ok: true });
  if (!p.nome || !p.email) return responde({ ok: false, erro: "campos obrigatórios ausentes" });

  var trava = LockService.getScriptLock();
  try {
    trava.waitLock(10000);
    var aba = pegaAba();
    var linha = COLUNAS.map(function (coluna, i) {
      return i === 0 ? new Date() : limpa(p[coluna]);
    });
    aba.appendRow(linha);
    return responde({ ok: true });
  } catch (falha) {
    console.error(falha);
    return responde({ ok: false, erro: "falha ao gravar" });
  } finally {
    trava.releaseLock();
  }
}

// Permite conferir no navegador se a URL publicada está no ar
function doGet() {
  return responde({ ok: true, servico: "pge-leads" });
}

function pegaAba() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight("bold");
  }
  return aba;
}

// Corta textos longos e impede que um valor vire fórmula (=, +, -, @); o apóstrofo também preserva o "+55" do telefone
function limpa(valor) {
  var texto = String(valor == null ? "" : valor).trim().slice(0, 500);
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function responde(corpo) {
  return ContentService.createTextOutput(JSON.stringify(corpo)).setMimeType(ContentService.MimeType.JSON);
}
