import ShoppingCart from "@/componenets/home/ShoppingCart";
import { getfetch } from "@/utils/fetch";
import { getblurdataurl, numberFormat, salePercent } from "@/utils/helper";
import Image from "next/image";

export default async function ProductPage({ params }) {
  const product = await getfetch(`/products/${decodeURI(params.slug)}`);

  return (
    <>
      <section className="single_page_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="row gy-5">
                <div className="col-sm-12 col-lg-6">
                  <h3 className="fw-bold mb-4"> {product?.name}</h3>
                  <h5 className="mb-3">
                    {product.is_sale ? (
                      <>
                        <span>{numberFormat(product.sale_price)}</span>
                        <del classNameName="me-1">
                          {numberFormat(product.price)}
                        </del>
                      </>
                    ) : (
                      <span>{numberFormat(product.price)}</span>
                    )}
                    <span>تومان</span>

                    {product.is_sale && (
                      <div className="text-danger fs-6">
                        {salePercent(product.price, product.sale_price)} % تخفیف
                      </div>
                    )}
                  </h5>
                  <p>{product.description} </p>

                  <ShoppingCart product={product} />
                  
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    data-bs-ride="carousel"
                  >
                    <div className="carousel-indicators">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to="0"
                        className="active"
                      ></button>

                      {product.images.map((img, index) => (
                        <button
                          type="button"
                          data-bs-target="#carouselExampleIndicators"
                          data-bs-slide-to={index + 1}
                        ></button>
                      ))}
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <Image
                          src={product.primary_image}
                          placeholder="blur"
                          blurDataURL={getblurdataurl()}
                          width={4640}
                          height={309}
                          className="d-block w-100"
                          alt="..."
                        />
                      </div>

                      {product.images.map((img) => (
                        <div key={img.id} className="carousel-item">
                          <Image
                            src={img.image}
                            className="d-block w-100"
                            placeholder="blur"
                            blurDataURL={getblurdataurl()}
                            width={4640}
                            height={309}
                            alt="..."
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="food_section my-5">
        <div className="container">
          <div className="row gx-3">
            <div className="col-sm-6 col-lg-3">
              <div className="box">
                <div>
                  <div className="img-box">
                    <img className="img-fluid" src="./images/b1.jpg" alt="" />
                  </div>
                  <div className="detail-box">
                    <h5>لورم ایپسوم متن</h5>
                    <p>
                      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
                      و با استفاده از طراحان گرافیک است.
                    </p>
                    <div className="options">
                      <h6>
                        <del>45,000</del>
                        34,000
                        <span>تومان</span>
                      </h6>
                      <a href="">
                        <i className="bi bi-cart-fill text-white fs-5"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
