# CSS Avançado – Grid

## Visão Geral
CSS Grid é um modelo de layout bidimensional que permite organizar elementos em colunas e linhas, criando designs complexos de forma declarativa. Quando combinado com Flexbox, oferece o máximo de flexibilidade.

## Propriedades Centrais
- `display: grid`
- `grid-template-columns` / `grid-template-rows`
- `grid-gap` / `gap`
- `grid-area`
- `grid-column` / `grid-row`
- `grid-template-areas`
- `fr` unit
- `minmax()`
- `auto-fit` / `auto-fill`
- `subgrid`

## Técnicas Avançadas

### 1. Grid Implícito + Explícito
Definir áreas explícitas e deixar o resto implícito.

```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}
header   { grid-area: header; }
sidebar  { grid-area: sidebar; }
main     { grid-area: main; }
footer   { grid-area: footer; }
```

### 2. Áreas Nomeadas
```css
.grid-template-areas:
  "header header"
  "sidebar main"
  "footer footer";

.element { grid-area: main; }
```

### 3. Frações (`fr`) para distribuição proporcional
```css
.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
```

### 4. `minmax()` para limites de tamanho
```css
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
```

### 5. `auto-fit` / `auto-fill`
Cria grids responsivas sem breakpoints explicitamente.

### 6. Subgrid (futuro)
Permite que uma sub‑grid herde a estrutura de sua parent.

### 7. Gap & `aspect-ratio`
Espaçamento consistente e proporções estáveis.

```css
.grid {
  gap: 1rem;
}
.card {
  aspect-ratio: 16 / 9;
}
```

## Exemplos Práticos

### 1. Layout de Página com Header, Main, Aside, Footer
```css
.container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}
header { grid-area: header; }
sidebar { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }
```

### 2. Grid de Cartões Responsivo
```css
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

### 3. Sticky Header com Grid
```css
.header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
}
```

## Boas Práticas
1. **Prefira `gap` a `margin`** para espaçamento entre itens.
2. **Use `repeat(auto-fit, minmax(min, 1fr))`** para grids fluidas que se adaptam ao tamanho da tela.
3. **Combine `grid-column`/`grid-row`** quando precisar posicionar itens sem criar áreas nomeadas.
4. **Teste em navegadores antigos**: o suporte a `subgrid` ainda está em crescimento.
5. **Integre com `Container Queries`** para adaptar valores de espaçamento dinamicamente.

## Próximos Passos
- Estude **Consultas de Contêiner (`@container`)** para layouts que dependem do tamanho interno do componente.
- Explore integrações com **CSS Custom Properties** para temas dinâmicos.
- Combine Grid com **Flexbox** em componentes internos quando precisar de flexibilidade unidimensional.
- Mantenha‑se atualizado com o spec de **Subgrid** (em rollout nos navegadores).

---
🧠 Gerado automaticamente via IA