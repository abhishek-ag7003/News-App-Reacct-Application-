import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let {title, description,imgUrl, newsUrl, author, date,source}= this.props;
    return (
      <div className='my-3'>
        <div className="card" >
          <img src={imgUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <span className="badge text-bg-secondary my-3">{new Date(date).toGMTString()}</span>
            <h5 className="card-title">{title}...</h5>
            <span className="position-absolute top-0 start-0 translate-top badge  bg-danger" style={{borderRadius: "0px 0px 8px 0px"}}>{source}</span>
            <p className="card-text">{description}...</p>
            <p className='card-text'><strong className='text-muted'> By {!author?"Unknown Source":author}</strong></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
          </div>
</div>
      </div>
    )
  }
}
