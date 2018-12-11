import React, { Component } from "react";
import axios from "axios";
import Form from "./component/Form";
import Item from "./component/Items";
import "./App.css";

const apiKey = "284b643282f75cbed8f20c9461e64b3c";
const api_Key =
  "cef88a661e760d0b32441b445ea24b8168155254564c8556a36179689b5b87a0";
const lien = "https://api.unsplash.com/search/photos";

class App extends Component {
  state = {
    meteo: {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    },
    wallpaper: [],
    iloading: true
  };

  componentDidMount() {
    this.getSearch();
  }

  getMeto = query => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${apiKey}&units=metric`
      )
      .then(res => {
        if (query) {
          this.setState({
            meteo: {
              temperature: res.data.main.temp,
              city: res.data.name,
              country: res.data.sys.country,
              humidity: res.data.main.humidity,
              description: res.data.weather[0].description,
              error: ""
            }
          });
        } else {
          this.setState({
            meteo: {
              temperature: undefined,
              city: undefined,
              country: undefined,
              humidity: undefined,
              description: undefined,
              error: "Please enter the Value"
            }
          }).catch(err => {
            console.log("juste une erreur de plus!!! ", err);
          });
        }
      });
  };

  getWallpaper = query => {
    axios
      .get(
        `${lien}?page=1&per_page=1&query=${query}&orientation=portrait&client_id=${api_Key}`
      )
      .then(res => {
        this.setState({
          wallpaper: res.data.results[0].urls.small,
          iloading: false
        });
      })
      .catch(err => console.log(err, "juste une petit erreur"));
  };

  getSearch = (query = "Paris") => {
    this.getMeto(query);
    this.getWallpaper(query);
  };

  render() {
    const {
      temperature,
      city,
      country,
      humidity,
      description,
      error
    } = this.state.meteo;
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-xs-5 wall">
                <h1 className="titreForm">
                  Météo de <br /> {city}
                </h1>

                {this.state.iloading ? (
                  <p>Loading</p>
                ) : (
                  <img src={this.state.wallpaper} alt="" />
                )}
              </div>
              <div className="col-xs-7 form-container">
                <Form getSearch={this.getSearch} />
                <Item
                  t={temperature}
                  c={city}
                  co={country}
                  h={humidity}
                  d={description}
                  e={error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
