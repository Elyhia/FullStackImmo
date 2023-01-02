import Head from "next/head";
import Link from "next/link";
import React from "react";

import {PriceByArea} from "../components/PriceByArea";

const Welcome = () => (
  <>
    <Head>
      <title>Sales stats</title>
    </Head>

    <div>
      <PriceByArea />
    </div>

  </>
);

export default Welcome;
