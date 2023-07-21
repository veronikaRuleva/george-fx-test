import { memo } from "react";
import { Card } from "./components/atoms/Card.component";
import { SearchInput } from "./components/molecules/SearchInput.component";
import { CurrencyExchangeRateList } from "./components/organisms/CurrencyExchangeRateList.component";
import { Header } from "./components/organisms/Header.component";
import { Container } from "./components/templates/Container.component";
import { useExchangeRates } from "./hooks/useExchangeRates.hook";

function App() {
  const { isLoading, isError, exchangeRates } = useExchangeRates();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !exchangeRates) return <div>Error occurred</div>;

  return (
    <>
      <Header />

      <main className="mt-18">
        <section className="bg-indigo p-4 sticky top-0">
          <Container>
            <Card className="bg-white" withBorder={false}>
              <SearchInput />
            </Card>
          </Container>
        </section>

        <section>
          <Container className="my-8 gap-y-4 grid">
            <CurrencyExchangeRateList
              exchangeRates={exchangeRates}
              data-testid="currency-exchange-rate-list"
            />
          </Container>
        </section>
      </main>
    </>
  );
}

export default App;
