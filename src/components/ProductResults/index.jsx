import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "../../redux/Products/products.actions";
import "./styles.scss";
import FormSelect from "../forms/FormSelect";
import Product from "./Product";
import { useHistory, useParams } from "react-router";
import LoadMore from "../LoadMore";

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

const ProductResults = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState);
  const {filterType}= useParams();
  const history = useHistory();

  const {data, queryDoc, isLastPage} = products

  useEffect(() => {
    dispatch(fetchProductsStart({filterType}));
  }, [filterType]);

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results</p>
      </div>
    );
  }

  const handleFilter =(e)=>{
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`)
    
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show all",
        value: "",
      },
      {
        name: "Mens",
        value: "mens",
      },
      {
        name: "Womens",
        value: "womens",
      }],
      handleChange: handleFilter
  };

  const handleLoadMore = ()=>{
    dispatch(fetchProductsStart({
      filterType, 
      startAfterDoc: queryDoc,
      persistProducts: data  
    }));
  }

  const configLoadMore ={
    onLoadMoreEvt:handleLoadMore
  }

  return (
    <div className="products">
      <h1>Browse products</h1>

      <FormSelect {...configFilters} />

      <div className="productResults">
        {data.map((product, pos) => {
          const { productThumbnail, productName, productPrice } = product;
          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === "undefined"
          ) {
            return null;
          }

          const configProduct = {
            ...product
          };

          return <Product {...configProduct} />;
        })}
      </div>
     {!isLastPage && <LoadMore {...configLoadMore} ></LoadMore>}
    </div>
  );
};

export default ProductResults;
