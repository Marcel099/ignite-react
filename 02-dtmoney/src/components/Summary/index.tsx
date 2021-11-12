import incomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import totalImage from '../../assets/total.svg';

import { Container } from "./styles";

export function Summary() {
  return (
    <Container>
      <li>
        <header>
          <p>Entradas</p>
          <img src={incomeImage} alt="Entradas" />
        </header>
        <strong>R$ 1000,00</strong>
      </li>
      <li>
        <header>
          <p>Saídas</p>
          <img src={outcomeImage} alt="Saídas" />
        </header>
        <strong>- R$ 500,00</strong>
      </li>
      <li className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImage} alt="Total" />
        </header>
        <strong>R$ 500,00</strong>
      </li>
    </Container>
  )
}