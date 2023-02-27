import React, { useState, useEffect } from "react";
import NewsItem from "./news-item/NewsItem";
import Loader from "../loader/Loader";
import PropTypes from "prop-types";

// import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
    const [articles, setArticles] =useState([])
    const [loading, setLoading] =useState(true)
    const [page, setPage] =useState(1)
    const [totalResults, setTotalResults] =useState(0)
    // const [hasMore, setHasMore] =useState(true)
    const capitalize = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    
    
    const updateNews = async ()=>{
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.categoryType}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      // setLoading( true );
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData.articles[0].source.name);
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
    }
    useEffect(()=>{
      // props.setProgress(15);
      document.title = capitalize(props.categoryType) + " - NewsMonkey";
      updateNews();
      // props.setProgress(100);

    },[])
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categoryType}&apiKey=13e5176ae2134a099a529be400b1c621&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData.articles[0].source.name);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });

    // console.log(this.state.page)


  // fetchData = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categoryType}&apiKey=13e5176ae2134a099a529be400b1c621&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   // console.log(parsedData.articles[0].source.name);
  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //     loading: false,
  //     page : this.state.page + 1
  //   });
  //   console.log(this.state.articles.length + "   "+ this.state.totalResults)
  // };

  const handlePreviousClick = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${
      props.categoryType
    }&apiKey=${props.apiKey}&page=${
      page - 1
    }&pageSize=${props.pageSize}`;
    setLoading( true );
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData) 
    setPage(page-1)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  };
  

  const handleNextClick = async () => {
    props.setProgress(0);

    if (
      !(
        page + 1 >
        Math.ceil(totalResults / props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        props.country
      }&category=${
        props.categoryType
      }&apiKey=${props.apiKey}&page=${
        page + 1
      }&pageSize=${props.pageSize}`;
      setLoading( true );
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData)
      setPage(page+1)
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      window.scrollTo(0, 0)
    }
    props.setProgress(100);

  };
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{marginTop:'75px'}}>
          NewsMonkey - Top {capitalize(props.categoryType)} Headlines
        </h1>
        {loading && <Loader />}

        {/* <InfiniteScroll
          dataLength={this.state.totalResults} //This is important field to render the next data
          next={this.fetchData}
          hasMore={this.state.hasMore}
          loader= {<Loader/>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        
        > */}
          {/* <div className="container"> */}
          <div className="row">
            {
              articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imgUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : "https://images.hindustantimes.com/tech/img/2023/02/21/960x540/comet_ztf_1676966429291_1676966437799_1676966437799.jpg"
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
          {/* </div> */}
        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-end gap-3">
          <button
            disabled={page <= 1}
            className="btn btn-primary"
            type="button"
            onClick={handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            className="btn btn-primary"
            type="button"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
 }

  News.defaultProps = {
    pageSize: 6,
    country: "in",
    categoryType: "general",
  };

  News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string.isRequired,
    categoryType: PropTypes.string.isRequired,
  };

export default News;
