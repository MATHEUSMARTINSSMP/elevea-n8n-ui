#!/usr/bin/env node

/**
 * Script de Merge - PARTE 1 + PARTE 2
 * 
 * Une o JSON base (PARTE 1) com os 6 blocos da PARTE 2
 * Gera: ELEVEA_N8N_FINAL_166_FUNCOES.json
 */

const fs = require('fs');
const path = require('path');

console.log('🔗 ELEVEA N8N - Merge PARTE 1 + PARTE 2');
console.log('==========================================\n');

// Verificar se está na pasta correta
const currentDir = process.cwd();
if (!currentDir.includes('n8n-workflows') && fs.existsSync('n8n-workflows')) {
  process.chdir('n8n-workflows');
  console.log('📁 Mudando para diretório n8n-workflows\n');
}

// Carregar PARTE 1
console.log('📥 Carregando PARTE 1...');
let parte1;
try {
  parte1 = JSON.parse(fs.readFileSync('ELEVEA_N8N_COMPLETO_TODAS_FUNCIONALIDADES.json', 'utf8'));
  console.log(`✅ PARTE 1 carregada:`);
  console.log(`   - ${parte1.nodes.length} nodes`);
  console.log(`   - ${Object.keys(parte1.connections).length} conexões`);
  console.log(`   - ${parte1.nodes.filter(n => n.type === 'n8n-nodes-base.webhook').length} endpoints\n`);
} catch (error) {
  console.error('❌ Erro ao carregar PARTE 1:', error.message);
  process.exit(1);
}

// Carregar blocos da PARTE 2
const blocos = [
  { file: 'PARTE2_BLOCO1_WHATSAPP_AVANCADO.json', name: 'WhatsApp Avançado' },
  { file: 'PARTE2_BLOCO2_ECOMMERCE.json', name: 'Ecommerce' },
  { file: 'PARTE2_BLOCO3_AGENDAMENTOS.json', name: 'Agendamentos' },
  { file: 'PARTE2_BLOCO4_AUDIT.json', name: 'Audit & Security' },
  { file: 'PARTE2_BLOCO5_MULTI_IDIOMA.json', name: 'Multi-idioma' },
  { file: 'PARTE2_BLOCO6_MARKETPLACE.json', name: 'Marketplace' }
];

console.log('📦 Carregando blocos da PARTE 2...\n');

let totalNodesAdded = 0;
let totalConnectionsAdded = 0;
const nodesAdded = [];
const connectionsAdded = [];

blocos.forEach((bloco, index) => {
  try {
    console.log(`${index + 1}. ${bloco.name}...`);
    const blocoData = JSON.parse(fs.readFileSync(bloco.file, 'utf8'));
    
    // Adicionar nodes
    const nodesCount = blocoData.nodes.length;
    parte1.nodes.push(...blocoData.nodes);
    totalNodesAdded += nodesCount;
    nodesAdded.push(...blocoData.nodes.map(n => n.id));
    
    // Adicionar connections
    const connectionsCount = Object.keys(blocoData.connections).length;
    Object.keys(blocoData.connections).forEach(key => {
      parte1.connections[key] = blocoData.connections[key];
    });
    totalConnectionsAdded += connectionsCount;
    connectionsAdded.push(...Object.keys(blocoData.connections));
    
    console.log(`   ✅ +${nodesCount} nodes, +${connectionsCount} conexões`);
  } catch (error) {
    console.log(`   ⚠️  AVISO: ${bloco.file} não encontrado ou erro ao carregar`);
    console.log(`      ${error.message}`);
  }
});

console.log('\n📊 ESTATÍSTICAS DO MERGE:');
console.log('==========================================');
console.log(`Nodes PARTE 1: ${parte1.nodes.length - totalNodesAdded}`);
console.log(`Nodes PARTE 2: ${totalNodesAdded}`);
console.log(`TOTAL NODES:   ${parte1.nodes.length}`);
console.log('');
console.log(`Conexões PARTE 1: ${Object.keys(parte1.connections).length - totalConnectionsAdded}`);
console.log(`Conexões PARTE 2: ${totalConnectionsAdded}`);
console.log(`TOTAL CONEXÕES:   ${Object.keys(parte1.connections).length}`);
console.log('');
console.log(`Webhooks totais: ${parte1.nodes.filter(n => n.type === 'n8n-nodes-base.webhook').length}`);
console.log(`Code nodes totais: ${parte1.nodes.filter(n => n.type === 'n8n-nodes-base.code').length}`);
console.log(`Airtable nodes totais: ${parte1.nodes.filter(n => n.type === 'n8n-nodes-base.airtable').length}`);

// Atualizar metadados
parte1.name = "ELEVEA N8N - Sistema Completo (166 Funcionalidades - 100% GAS)";
parte1.versionId = "FINAL-COMPLETE-V4.0-166FUNC";
if (parte1.tags && parte1.tags[0]) {
  parte1.tags[0].name = "ELEVEA Complete 166 Functions (100% GAS Coverage)";
  parte1.tags[0].updatedAt = new Date().toISOString();
}

// Salvar resultado
const outputFile = 'ELEVEA_N8N_FINAL_166_FUNCOES.json';
console.log(`\n💾 Salvando resultado em ${outputFile}...`);
fs.writeFileSync(outputFile, JSON.stringify(parte1, null, 2));

const stats = fs.statSync(outputFile);
console.log(`✅ Arquivo gerado com sucesso!`);
console.log(`   Tamanho: ${(stats.size / 1024).toFixed(2)} KB`);
console.log(`   Linhas: ~${fs.readFileSync(outputFile, 'utf8').split('\n').length}`);

console.log('\n🎉 MERGE CONCLUÍDO COM SUCESSO!');
console.log('==========================================');
console.log('📄 Arquivo: ELEVEA_N8N_FINAL_166_FUNCOES.json');
console.log('');
console.log('🚀 Próximos passos:');
console.log('   1. Importar o JSON no n8n');
console.log('   2. Configurar credenciais (Airtable, Resend, WhatsApp, MP)');
console.log('   3. Ativar o workflow');
console.log('   4. Testar os endpoints');
console.log('');
console.log('📚 Documentação: Veja GUIA_MERGE_PARTE1_PARTE2_COMPLETO.md');
console.log('');

