import { GetServerSideProps, NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "react-query";

import Pagination from "../../components/common/Pagination";
import { List } from "../../components/sale/List";
import { PagedCollection } from "../../types/collection";
import { Sale } from "../../types/Sale";
import { fetch, FetchResponse } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

const getSales = async () => await fetch<PagedCollection<Sale>>("/sales");

const Page: NextComponentType<NextPageContext> = () => {
  const { data: { data: sales, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Sale>> | undefined
  >("sales", getSales);
  const collection = useMercure(sales, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Sale List</title>
        </Head>
      </div>
      <List sales={collection["hydra:member"]} />
      <Pagination collection={collection} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("sales", getSales);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Page;
