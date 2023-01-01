import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Show } from "../../../components/sale/Show";
import { PagedCollection } from "../../../types/collection";
import { Sale } from "../../../types/Sale";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getSale = async (id: string | string[] | undefined) =>
  id ? await fetch<Sale>(`/sales/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: sale, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Sale> | undefined>(["sale", id], () => getSale(id));
  const saleData = useMercure(sale, hubURL);

  if (!saleData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Sale ${saleData["@id"]}`}</title>
        </Head>
      </div>
      <Show sale={saleData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["sale", id], () => getSale(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Sale>>("/sales");
  const paths = await getPaths(response, "sales", "/sales/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
