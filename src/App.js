import React, { Component } from 'react';
import online_groceries from './images/online_groceries.svg';
import questions from './images/questions.svg';
import success_factors from './images/success_factors.svg';
import heavy_box from './images/heavy_box.svg';
import agreement from './images/agreement.svg'
import 'App.css';

class Info extends Component {
  constructor(props) {
    super(props)

  }
  render () {
    return(
      <div>
        <img src={this.props.img_src} className={"image-"+this.props.img_side} alt={this.props.inf}/>
        <span className={"title-"+this.props.text_side}>{this.props.inf}</span><br/>
        <span className={"text-"+this.props.text_side}>
          <p>{this.props.text}
          </p>
          <p>
            {this.props.text2}
          </p>
        </span>
      </div>
    );
  }
}
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
          <Info text={`A smart é uma plataforma de transformação digital para pequenos e médios comerciantes 
          locais, viabilizando que façam parcerias e vendam seus produtos para os consumidores à um custo de entrega 
          reduzido e uma logística melhorada.`} 
                text2={""}
                inf={"O que é a smart?"}
                img_side={"left"}
                text_side={"right"}
                img_src={questions}
          ></Info>
          <Info text={`A nossa proposta é intermediar uma relação entre duas ou mais empresas, 
          onde a loja vendedora terá sua loja virtual, e suas parceiras agirão como pontos de entrega,
           onde os consumidores poderão retirar em mãos os produtos comprados.`} 
                text2={""}
                inf={"O que fazemos?"}
                img_side={"right"}
                text_side={"left"}
                img_src={agreement}
          ></Info>

          <Info text={`Primariamente lojas de comércio local; desde lojas que simplesmente querem entrar no 
                comercio digital, às lojas interessadas em nosso sistema de logística inovador, 
                que descentraliza o varejo favorecendo a erradicação do Covid-19, além de reduzir os custos.`} 
                text2={""}
                inf={"Quem pode usar?"}
                img_side={"left"}
                text_side={"right"}
                img_src={online_groceries}
          ></Info>

          <Info text={`Apos cadastrar sua loja, você poderá inserir seus produtos ou ser um ponto 
              de entrega para atuar como ponto de distribuição de outra loja. Em seguida é possível encontrar 
              parceiros para distribuir seus produtos na sua cidade. O cliente faz o pedido no aplicativo
              e escolhe o ponto de entrega mais conveniente para ele.`} 
                text2={""}
                inf={"Como funciona?"}
                img_side={"right"}
                text_side={"left"}
                img_src={success_factors}
          ></Info>

          <Info text={`A loja separa o produto e espera a hora combinada com seus parceiros. Quando a hora chegar, a loja leva 
                todas as encomendas. O ponto de entrega confirma o recebimento e o cliente recebe uma notificação para ir buscar.`} 
                text2={""}
                inf={"O cliente pediu, e agora?"}
                img_side={"left"}
                text_side={"right"}
                img_src={heavy_box}
          ></Info>

        </div>
        <div className="footer"></div>
      </div>
    );
  }
}

export default App;