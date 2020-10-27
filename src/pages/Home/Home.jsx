import React from "react";
import axios from "axios";
import styles from "./Home.module.css";
import imageHeader from "../../images/head.png";
import Typography from "@material-ui/core/Typography";
import PickCountry from "../../components/PickCountry/PickCountry";
import Cards from "../../components/Cards/Cards";

class Home extends React.Component {
  state = {
    name: "",
    data: {},
  };

  componentDidMount() {
    this.getData();
    console.log("Component did mount");
  }

  getData = (country) => {
    let setUrl = "https://covid19.mathdro.id/api";
    setUrl = country ? `${setUrl}/countries/${country}` : setUrl;
    axios
      .get(setUrl)
      .then((response) => {
        this.setState({
          data: response.data,
        });
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
  };

  handleCountryChange = (event) => {
    let country = event.target.value;
    this.getData(country);
    const setCountry = country ? country : "Global";
    this.props.history.push({
      search: "?country=" + setCountry,
    });
  };

  render() {
    const { data } = this.state;
    const lastUpdate = new Date(data.lastUpdate).toDateString();
    console.log(lastUpdate);

    return (
      <div className={styles.container}>
        <img className={styles.image} src={imageHeader} alt="Covid-19" />
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Terakhir Update : {lastUpdate}
        </Typography>
        <PickCountry handleCountryChange={this.handleCountryChange} />
        <Cards data={data} />
      </div>
    );
  }
}

export default Home;
