import React, { Component } from "react";
import NewsItem from "./news-item/NewsItem";
import Loader from "../loader/Loader";
import PropTypes from "prop-types";

// import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    pageSize: 6,
    country: "in",
    categoryType: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string.isRequired,
    categoryType: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults : 0,
      hasMore:true
    };
    document.title = this.capitalize(this.props.categoryType) + " - NewsMonkey";
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  async componentDidMount() {
    this.props.setProgress(15);
    this.updateNews()
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
    this.props.setProgress(100);

    // console.log(this.state.page)
  }

  updateNews = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.categoryType}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData.articles[0].source.name);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

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

  handlePreviousClick = async () => {
    // console.log("previous")
    this.props.setProgress(0);

    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.categoryType
    }&apiKey=${this.props.apiKey}&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
      refresh: true,
    });
    this.props.setProgress(100);

  };
  

  handleNextClick = async () => {
    this.props.setProgress(0);

    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.categoryType
      }&apiKey=${this.props.apiKey}&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData)
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
      window.scrollTo(0, 0)
    }
    this.props.setProgress(100);

  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-3">
          NewsMonkey - Top {this.capitalize(this.props.categoryType)} Headlines
        </h1>
        {this.state.loading && <Loader />}

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
              this.state.articles.map((element) => {
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
            disabled={this.state.page <= 1}
            className="btn btn-primary"
            type="button"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-primary"
            type="button"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
