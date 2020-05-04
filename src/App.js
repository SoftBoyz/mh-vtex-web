import React, { Component } from 'react';
import business_deal from './images/business_deal.svg';
import online_groceries from './images/online_groceries.svg';
import questions from './images/questions.svg';
import success_factors from './images/success_factors.svg';
import 'App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="name">
              smart
          </div>
          <div className="slogan">
            Descentralizando o varejo local!
          </div>
          <div className="options">
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="/login">Entrar</a></li>
              <li><a href="/register">Cadastrar</a></li>
            </ul>
          </div>
          <div className="image"></div>
        </div>

        <div className="info">
          <div>
            <img src={questions} className="image-left" />
            <span className="title-right">O que é?</span><br/>
            <span className="text-right">
            <p>
              A smart é uma plataforma de transformação digital para pequenos e médios comerciantes locais, 
              viabilizando que façam parcerias e vendam seus produtos para os consumidores à um custo de entrega 
              reduzido e uma logística melhorada.
            </p>
            <p>
              A nossa proposta é intermediar uma relação entre duas ou mais empresas, onde a loja vendedora terá 
              sua loja virtual, e suas parceiras agirão como pontos de entrega, onde os consumidores poderão retirar 
              em mãos os produtos comprados.
            </p>
            </span>
          </div>

          <div>
            <img src={online_groceries} className="image-right" />
            <span className="title-left">Quem pode usar?</span><br/>
            <span className="text-left">
              <p>
                Lojas que precisam se adaptar ao comércio virtual no mundo pós COVID-19.
                Enfatizamos lojas locais de pequeno e médio porte, que focam no setor de varejo, 
                visto que para essas lojas, principalmente as que vendem produtos de necessidade primária, 
                não havia necessidade nem incentivo para se inserir no meio digital, arcar com custos de 
                receber encomendas e entrega domiciliar.
              </p>
            </span>
          </div>

          <div>
            <img src={success_factors} className="image-left" />
            <span className="title-right">Outro titulo aqui</span><br/>
            <span className="text-right">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet diam mi. Maecenas nec velit pharetra, iaculis nunc in, dapibus nisi. Proin fringilla, mauris at dapibus dapibus, augue mi volutpat massa, a placerat sapien dolor eget nulla. Nunc vitae tristique nisl. Etiam congue eu augue in laoreet. Nam et vulputate nulla. Fusce rutrum sollicitudin lacus et bibendum. Curabitur a libero lacinia odio iaculis maximus. Mauris nec odio consectetur, elementum augue ac, suscipit nibh. Sed eu lacus purus.
            </p>
            </span>
          </div>
        </div>

        <div className="footer"></div>

      </div>
    );
  }
}

export default App;