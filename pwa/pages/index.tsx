import Head from "next/head";
import Link from "next/link";
import React from "react";
import bg from "../public/background.jpg";
import {PriceByArea} from "../components/PriceByArea";
import {SalesByMonth} from "../components/SalesByMonth";
import {SalesByRegion} from "../components/SalesByRegion";

const Welcome = () => (
  <>
    <Head>
      <title>Statistiques</title>
    </Head>


    <header className="titre fixed-top">
      <div>
        <h3>Statistiques ventes immobilières</h3>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="#graph1">Prix au mètre carré</a>
              <a className="nav-item nav-link active" href="#graph2">Ventes par année</a>
              <a className="nav-item nav-link active" href="#">Ventes par région</a>
            </div>
          </div>
        </nav>
      </div>
    </header>


    <div className="corps">
      <div id="graph1" className="card border-secondary mb-3">
        <div className="card-img-top graph">
          <PriceByArea />
        </div>
        <div className="card-body titleGraph">
          <h5 className="card-title">Prix au mètre carré</h5>
        </div>
      </div>

      <div id="graph2" className="card border-secondary mb-3">
        <div className="card-img-top graph">
          <SalesByMonth />
        </div>
        <div className="card-body titleGraph">
          <h5 className="card-title">Ventes par années</h5>
        </div>
      </div>


    </div>
  </>
);

export default Welcome;
