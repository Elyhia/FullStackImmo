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

import { Form } from "../../../components/sale/Form";
import { PagedCollection } from "../../../types/collection";
import { Sale } from "../../../types/Sale";
import { fetch, FetchResponse, getPaths } from "../../../utils/dataAccess";

const getSale = async (id: string | string[] | undefined) =>
  id ? await fetch<Sale>(`/sales/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: sale } = {} } = useQuery<
    FetchResponse<Sale> | undefined
  >(["sale", id], () => getSale(id));

  if (!sale) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{sale && `Edit Sale ${sale["@id"]}`}</title>
        </Head>
      </div>
      <Form sale={sale} />
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
  const paths = await getPaths(response, "sales", "/sales/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
