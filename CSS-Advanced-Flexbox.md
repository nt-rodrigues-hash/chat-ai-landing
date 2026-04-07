# CSS Avançado – Flexbox

## Visão Geral
Flexbox (CSS Flexible Box Layout) é um modelo de layout unidimensional que permite distribuir espaço entre itens e alinhá-los em um eixo (linha ou coluna). Embora o conceito básico seja simples, existem técnicas avançadas que tornam o Flexbox ainda mais poderoso.

## Propriedades Centrais

| Propriedade | Função |
|-------------|--------|
| `display: flex` | Ativa o contexto flex no container |
| `flex-direction` | Define o eixo principal (`row`, `column`, `row-reverse`, `column-reverse`) |
| `flex-wrap` | Controla a quebra de linha (`nowrap`, `wrap`, `wrap-reverse`) |
| `flex-flow` | Atalho para `flex-direction` + `flex-wrap` |
| `justify-content` | Alinhamento no eixo principal |
| `align-items` | Alinhamento no eixo transversal (cross axis) |
| `align-content` | Alinhamento de linhas quando há quebra (`wrap`) |
| `gap` | Espaço entre os itens (não precisa de margins) |

## Técnicas Avançadas

### 1. Crescimento e Encolhimento Inteligente
A shorthand `flex` aceita três valores: `flex-grow`, `flex-shrink`, `flex-basis`.

```css
.item {
  flex: 1 1 200px; /* grow=1, shrink=1, basis=200px */
}
```

- **flex-grow**: define a proporção de crescimento quando há espaço disponível.
- **flex-shrink**: define a proporção de encolhimento quando o espaço é insuficiente.
- **flex-basis**: tamanho base antes de distribuir o espaço.

> Dica: Use `flex: 1` para criar colunas de largura igual que ocupam todo o espaço disponível.

### 2. Alinhamento Individual com `align-self`
Cada item pode sobrescrever o alinhamento do container:

```css
.item-especial {
  align-self: flex-end;
}
```

### 3. Margens Automáticas para Posicionamento
Margens automáticas no eixo principal absorvem todo o espaço disponível, permitindo criar padrões como “botão à direita”:

```css
.nav {
  display: flex;
  justify-content: space-between;
}
.nav .logo {
  margin-right: auto; /* empurra os demais itens para a direita */
}
```

### 4. Uso de `gap` para Espaçamento Consistente
O `gap` aplica espaçamento uniforme sem interferir em `margin` ou `border`:

```css
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
```

### 5. Flexbox com Variáveis CSS
Combine custom properties para criar sistemas de layout reutilizáveis:

```css
:root {
  --flex-gap: 1.5rem;
  --flex-align: center;
}
.grid {
  display: flex;
  gap: var(--flex-gap);
  align-items: var(--flex-align);
}
```

### 6. Layout Responsivo com Media Queries
Altere a direção ou o comportamento conforme o tamanho da tela:

```css
.container {
  display: flex;
  flex-direction: column;
}
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
```

### 7. “Sticky Footer” com Flexbox
Uma técnica clássica para manter o rodapé sempre no final da página, mesmo com pouco conteúdo:

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1; /* ocupa todo o espaço restante */
}
```

### 8. Itens com Tamanho Mínimo e Máximo
Use `min-width`/`max-width` em conjunto com `flex-basis` para evitar que itens fiquem muito pequenos ou grandes:

```css
.card {
  flex: 1 1 300px;
  max-width: 500px;
  min-width: 200px;
}
```

## Padrões Comuns

- **Card Grid**: `flex-wrap: wrap` + `gap` cria um grid de cards responsivo sem usar Grid.
- **Navegação com Logo Central**: `justify-content: space-between` + margem automática no logo.
- **Barra de工具 (Toolbar)**: `display: flex; align-items: center; gap: .5rem;`.
- **Lista de Itens com Ícone**: `display: flex; align-items: center;` para alinhar ícone e texto.

## Exemplo Completo: Galeria de Imagens Responsiva

```html
<div class="gallery">
  <div class="photo">...</div>
  <div class="photo">...</div>
  <div class="photo">...</div>
</div>
```

```css
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.photo {
  flex: 1 1 250px; /* cresce, encolhe, base de 250px */
  max-width: 400px;
}
```

Ao reduzir a tela, os itens passam para a linha seguinte automaticamente, mantendo um tamanho mínimo legível.

## Boas Práticas

1. **Prefira `gap` a margens** – evita problemas de cálculo de espaço.
2. **Evite `flex-basis` e `width` juntos** – podem conflitar. Use apenas `flex`.
3. **Use `flex: 1` para colunas flexíveis** – cria colunas que se ajustam igualmente.
4. **Combine com CSS Grid** – Flexbox é excelente para layouts unidimensionais; Grid para bidimensionais.
5. **Teste em navegadores** – a maioria das propriedades Flexbox tem bom suporte, mas verifique versões antigas se necessário.

## Próximos Passos
- Explore o **CSS Grid** para layouts bidimensionais (cf. `[CSS-Advanced-Grid](./CSS-Advanced-Grid.md)`).
- Aprenda a criar **animações com Flexbox** (cf. `[CSS-Advanced-Animations](./CSS-Advanced-Animations.md)`).
- Use **Custom Properties** para temas flexíveis (cf. `[CSS-Advanced-Custom-Properties](./CSS-Advanced-Custom-Properties.md)`).

---
🧠 Gerado automaticamente via IA