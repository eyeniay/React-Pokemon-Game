import React, { Component } from "react";

export default class MainApp extends Component {
  state = {
    data: [],
    first_character_data: [],
    second_character_data: [],
    first_character_img: "",
    second_character_img: "",
    failFlag: false,
    fight: false,
    point: 0
  };

  componentDidMount() {
    fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          data: json
        });
        this.getCharacters();
      });
  }

  randomNumber() {
    let min = 1;
    let max = 915;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getCharacters = () => {
    let numFirst = this.randomNumber();
    let numSecond = this.randomNumber();
    let imgFirst =
      "https://pokeres.bastionbot.org/images/pokemon/" +
      parseInt(this.state.data.results[numFirst].national_number, 10) +
      ".png";
    let imgSecond =
      "https://pokeres.bastionbot.org/images/pokemon/" +
      parseInt(this.state.data.results[numSecond].national_number, 10) +
      ".png";

    this.setState({
      first_character_data: this.state.data.results[numFirst],
      second_character_data: this.state.data.results[numSecond],
      first_character_img: imgFirst,
      second_character_img: imgSecond,
      fight: false
    });
  };

  firstImageClicked = () => {
    this.setState({
      failFlag:
        parseInt(this.state.first_character_data.total, 10) >
        parseInt(this.state.second_character_data.total, 10),
      point:
        parseInt(this.state.first_character_data.total, 10) >
        parseInt(this.state.second_character_data.total, 10)
          ? this.state.point + 50
          : this.state.point - 50,
      fight: true
    });
  };

  secondImageClicked = () => {
    this.setState({
      failFlag:
        parseInt(this.state.second_character_data.total, 10) >
        parseInt(this.state.first_character_data.total, 10),
      point:
        parseInt(this.state.second_character_data.total, 10) >
        parseInt(this.state.first_character_data.total, 10)
          ? this.state.point + 50
          : this.state.point - 50,
      fight: true
    });
  };

  render() {
    return (
      <div className="container">
        <div className="view_image_container">
          <div className="view_image">
            <div className="color_title">
              {this.state.first_character_data.name}
            </div>
            <img
              src={this.state.first_character_img}
              onClick={e => this.firstImageClicked()}
            />
          </div>
          <div className="view_image">
            <div className="color_title">
              {this.state.second_character_data.name}
            </div>
            <img
              src={this.state.second_character_img}
              onClick={e => this.secondImageClicked()}
            />
          </div>
        </div>
        <div className="view_button">
          <div
            className="chipPoke chip_getPokemons"
            onClick={e => this.getCharacters()}
          >
            Pokemon Getir
          </div>
        </div>
        <div className="view_skills_container">
          {this.state.fight ? (
            <div className="view_chip">
              <div className="view_skill">
                <div className="chip_icon detail">Toplam</div>
                <div className="chip_skill detail">
                  {this.state.first_character_data.total}
                </div>
                <div className="chip_icon detail">Can</div>
                <div className="chip_skill detail">
                  {this.state.first_character_data.hp}
                </div>
                <div className="chip_icon detail">Atak</div>
                <div className="chip_skill detail">
                  {this.state.first_character_data.attack}
                </div>
                <div className="chip_icon detail">Savunma</div>
                <div className="chip_skill detail">
                  {this.state.first_character_data.defense}
                </div>
                <div className="chip_icon detail">Hız</div>
                <div className="chip_skill detail">
                  {this.state.first_character_data.speed}
                </div>
              </div>
              <div className="view_skill">
                <div className="chip_skill detail">
                  {this.state.second_character_data.total}
                </div>
                <div className="chip_skill detail">
                  {this.state.second_character_data.hp}
                </div>
                <div className="chip_skill detail">
                  {this.state.second_character_data.attack}
                </div>
                <div className="chip_skill detail">
                  {this.state.second_character_data.defense}
                </div>
                <div className="chip_skill detail">
                  {this.state.second_character_data.speed}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {this.state.point > 0 ? (
            <div className="point color_success">{this.state.point}</div>
          ) : (
            <div className="point color_fail">{this.state.point}</div>
          )}
          {this.state.fight ? (
            this.state.failFlag ? (
              <div className="color_success_alt">+50</div>
            ) : (
              <div className="color_fail_alt">-50</div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
