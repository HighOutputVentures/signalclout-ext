import useSWR from "swr";
import { fetcher } from "../graphql/client";
import { USD_PRICE_QUERY } from "../graphql/query/usd-price";
import { BitCloutPrice } from "../type/bitclout-price";

interface Data {
  bitCloutPrice: BitCloutPrice;
}

const useUSDPrice = (): number => {
  const { data } = useSWR<Data>(USD_PRICE_QUERY, fetcher());

  if (data) {
    const usdPrice =
      data?.bitCloutPrice?.satoshisPerBitClout *
      data?.bitCloutPrice?.usdBitcoinLast *
      1e-8;

    return usdPrice;
  }

  return 0;
};

export default useUSDPrice;
