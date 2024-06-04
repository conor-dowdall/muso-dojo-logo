const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    .md-header-wrapper {
      --_md-header-wrapper-max-width: var(--md-header-wrapper-max-width, 100%);
      --_md-header-max-width: var(--md-header-max-width, 110rem);
      --_md-header-min-height: var(--md-header-min-height, 100svh);
      --_md-header-gap: var(--md-header-gap, 0);
      --_md-header-font-size: var(--md-header-font-size, 3rem);

      --_md-logo-letter-size: var(--md-logo-letter-size, 10rem);
      --_md-logo-size: var(--md-logo-size, 1.4em);

      font-family: "Stick", sans-serif;
      font-weight: 400;
      font-style: normal;

      margin: auto;
      max-width: var(--_md-header-max-width);
      min-height: var(--_md-header-min-height);

      display: flex;
      gap: var(--_md-header-gap);
      flex-direction: row;
      align-items: center;
      justify-items: center;

      > div {
        &.title,
        &.subtitle {
          flex: 1 0 0;

          & > h1,
          h2 {
            white-space: nowrap;
            font-size: var(--_md-header-font-size);
            text-align: center;
            margin: 0;
          }
        }

        &.logo {
          flex: 0 0 var(--_md-logo-size);
          display: grid;
          place-items: center;
          font-size: var(--_md-logo-letter-size);
          aspect-ratio: 1;
          background-color: white;
          border-radius: 50%;

          > .logo-text {
            font-weight: bold;
            line-height: 0.62;
            background-image: linear-gradient(
              to right,
              #db2f08 0% 12%,
              #fadc00 40%,
              #14d139 60%,
              #01a5db,
              #4e2370 90% 100%
            );
            background-clip: text;
            color: transparent;
          }
        }
      }
    }
  </style>

  <div class="md-header-wrapper">
    <div class="title">
      <h1>Muso Dojo</h1>
    </div>

    <div class="logo">
      <div class="logo-text">M</div>
    </div>

    <div class="subtitle">
      <h2>Play Music</h2>
    </div>
  </div>
`;

class MDHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("md-header", MDHeader);

export default MDHeader;
