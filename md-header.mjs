const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    .md-header-wrapper {
      --_header-wrapper-max-width: var(--header-wrapper-max-width, 100%);
      --_header-max-width: var(--header-max-width, 110rem);
      --_header-min-height: var(--header-min-height, 100svh);
      --_header-gap: var(--header-gap, 0);
      --_header-font-size: var(--header-font-size, 3rem);

      --_logo-letter-size: var(--logo-letter-size, 10rem);
      --_logo-size: var(--logo-size, 1.4em);

      font-family: "Stick", sans-serif;
      font-weight: 400;
      font-style: normal;

      margin: auto;
      max-width: var(--_header-max-width);
      min-height: var(--_header-min-height);

      display: flex;
      gap: var(--_header-gap);
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
            font-size: var(--_header-font-size);
            text-align: center;
            margin: 0;
          }
        }

        &.logo {
          flex: 0 0 var(--_logo-size);
          display: grid;
          place-items: center;
          font-size: var(--_logo-letter-size);
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
