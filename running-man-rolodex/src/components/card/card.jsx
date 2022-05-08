import { Component } from "react";
import './card.css';

class Card extends Component {
    render() {
        const {id, name, description} = this.props.member;

        return (
            <div className='card-container' key={id}>
                <img alt={`member ${name}`} src={require(`../../assets/${id}.jpeg`)} />
                <h2>{name}</h2>
                <h4>{description}</h4>
            </div>
        )
    }
}

export default Card;
