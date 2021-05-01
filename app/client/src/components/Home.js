import React, { Component } from 'react';


export default class Home extends Component {
    render() {
        return (
            <div class="container-fluid">


                <div class="row">
                    <div class="col-sm-4 my-auto">
                        <h2><strong>It has never been easier to understand the global commodities market.</strong></h2><br />
                        Our project is an innovation because existing resources deal mostly with individual sectors like energy or agriculture, but not the the whole commodities space, and they are read only. Our project provides a useful resource for trade houses, banks and hedge funds.


                    </div>

                    <div class="col-sm-8">
                        {/* slideshow of commodity images */}
                        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                            <div class="carousel-inner">
                                {/* default image */}
                                <div class="carousel-item active">
                                    <img src="home-1.jpg" class="img-fluid"></img>
                                </div>

                                <div class="carousel-item">
                                    <img src="home-2.jpg" class="img-fluid"></img>
                                </div>

                                <div class="carousel-item">
                                    <img src="home-3.jpg" class="img-fluid"></img>
                                </div>

                                <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}