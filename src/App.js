import React, { Component } from 'react';
import online_groceries from './images/online_groceries.svg';
import questions from './images/questions.svg';
import success_factors from './images/success_factors.svg';
import heavy_box from './images/heavy_box.svg';
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
              <li><a href="/login">Entrar</a></li>
              <li><a href="/register">Cadastrar</a></li>
            </ul>
          </div>
          <div className="image"></div>
        </div>

        <div className="info">
          <div>
            <img src={questions} className="image-left" alt="o que é?"/>
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
            <img src={online_groceries} className="image-right" alt="Quem pode usar?"/>
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
            <img src={success_factors} className="image-left" alt="Como funciona?"/>
            <span className="title-right">Como funciona?</span><br/>
            <span className="text-right">
            <p>
              O primeiro passo é cadastrar sua empresa como loja para vender seus produtos ou como ponto 
              de entrega para receber os produtos de outra loja, ou os dois. Em seguida é possível encontrar 
              parceiros para distribuir seus produtos na sua cidade. Os clientes pedem no aplicativo o produto 
              de uma loja e escolhem o ponto de entrega mais próximo dele. 
            </p>
            </span>
          </div>

          <div>
            <img src={heavy_box} className="image-right" alt="O cliente pediu, e agora?"/>
            <span className="title-left">O cliente pediu, e agora?</span><br/>
            <span className="text-left">
              <p>
                O produto levará um tempo para ser processado juntamente a outros pedidos da loja, depois de um 
                tempo a loja deverá enviar os pedidos para os pontos de entregas e notificar os clientes do envio 
                através do aplicativo.
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