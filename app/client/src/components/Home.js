import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <div class="container-fluid">


                <div class="row">
                    <div class="col-sm-4 my-auto">
                        <h2><strong>It has never been easier to understand the global commodities market.</strong></h2><br />
                        Existing commodities databases deal with industry silos, like energy or agriculture. 
                        At Commodify, we collate data across the entire commodities space, and provide them in an 
                        interactive interface. Commodify proves to be an effective tool for trade houses, 
                        banks and hedge funds for intuitive decision-making.


                    </div>

                    <div class="col-sm-8">
                        {/* slideshow of commodity images */}
                        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
                            <div class="carousel-inner">
                                {/* default image */}
                                <div class="carousel-item active">
                                    <img src="home-1.jpg" class="img-fluid"></img>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h3>Sheep wool farming in New Zealand</h3>
                                        <h5>Photo by Wenhao Ji on Unsplash
  </h5>
                                    </div>
                                </div>

                                <div class="carousel-item">
                                    <img src="home-2.jpg" class="img-fluid"></img>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h3>Cocoa beans in an Ivory Coast farm</h3>
                                        <h5>Photo by Etty Fidele on Unsplash</h5>
                                    </div>
                                </div>

                                <div class="carousel-item">
                                    <img src="home-3.jpg" class="img-fluid"></img>
                                    <div class="carousel-caption d-none d-md-block">
                                        <h3>Wind farm in Turlock, United States</h3>
                                        <h5>Photo by American Public Power Association on Unsplash</h5>
                                    </div>
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
