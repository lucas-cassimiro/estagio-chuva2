import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe("toggleResumo", () => {
  let resumoCompleto;
  let btnShowMore;
  let resumoBox;
  let proximaCaixa;

  beforeEach(() => {
    resumoCompleto = document.createElement("div");
    resumoCompleto.classList.add("resumo-content", "completo");
    resumoCompleto.style.display = "none";

    btnShowMore = document.createElement("button");
    btnShowMore.classList.add("btn-show-more");

    resumoBox = document.createElement("div");
    resumoBox.classList.add("resumo-box");
    resumoBox.style.height = "100px";

    proximaCaixa = document.createElement("div");
    proximaCaixa.classList.add("resumo-box2");

    document.body.appendChild(resumoCompleto);
    document.body.appendChild(btnShowMore);
    document.body.appendChild(resumoBox);
    document.body.appendChild(proximaCaixa);
  });

  afterEach(() => {
    document.body.removeChild(resumoCompleto);
    document.body.removeChild(btnShowMore);
    document.body.removeChild(resumoBox);
    document.body.removeChild(proximaCaixa);
  });

  it("should toggle display and text content", () => {
    toggleResumo();
    expect(resumoCompleto.style.display).toBe("block");
    expect(btnShowMore.textContent).toBe("ver menos");
    expect(resumoBox.style.height).toBe(resumoBox.scrollHeight + "px");

    toggleResumo();
    expect(resumoCompleto.style.display).toBe("none");
    expect(btnShowMore.textContent).toBe("ver mais");
    expect(resumoBox.style.height).toBe("auto");
  });

  it("should adjust margin top of proximaCaixa", () => {
    toggleResumo();
    const margemSuperiorDesejada = -10;
    const margemSuperior = resumoBox.scrollHeight + margemSuperiorDesejada;
    expect(proximaCaixa.style.marginTop).toBe(margemSuperior + "px");
  });
});

describe("Event Listeners", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container-success"></div>
      <div class="resumo-box3"></div>
      <div class="resumo-content2"></div>
      <div class="paragrafer"></div>
      <button class="create-topic-button"></button>
    `;
  });

  it("should show container-success and hide resumo-box3 on enviar-topico click", () => {
    document.querySelector(".enviar-topico").click();
    expect(document.querySelector(".container-success").style.display).toBe(
      "flex"
    );
    expect(document.querySelector(".resumo-box3").style.display).toBe("none");
  });

  it("should hide resumo-content2, paragrafer, and create-topic-button, and show resumo-box3 and criar-topico-box on create-topic-button click", () => {
    document.querySelector(".create-topic-button").click();
    expect(document.querySelector(".resumo-content2").style.display).toBe(
      "none"
    );
    expect(document.querySelector(".paragrafer").style.display).toBe("none");
    expect(document.querySelector(".create-topic-button").style.display).toBe(
      "none"
    );
    expect(document.querySelector(".resumo-box3").style.display).toBe("block");
    expect(document.getElementById("criar-topico-box").style.display).toBe(
      "block"
    );
  });

  // Teste para o formulário de feedback
  it("should prevent default form submission and show alert on feedback-form submit", () => {
    const spy = spyOn(window, "alert");
    document
      .getElementById("feedback-form")
      .dispatchEvent(new Event("submit", { cancelable: true }));
    expect(spy).toHaveBeenCalledWith("Aguardando feedback dos autores");
  });
});

