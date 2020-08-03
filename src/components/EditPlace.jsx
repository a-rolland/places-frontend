import React, { Component } from 'react'
import axios from 'axios'

export class EditPlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: ''
        }
    }
    componentDidMount = () => {
        this.getPlace()
    }
    getPlace = () => {
        const { params } = this.props.match
        axios.get('http://localhost:5000/api/places/' + params.id)
        .then(({data}) => {
            this.setState({
                name: data.name,
                description: data.description
            })
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    handleChange = ({target}) => {
        const {name, value} = target
        this.setState({
            [name]: value
        })
    }
    handleSave = e => {
        e.preventDefault()
        const { params } = this.props.match
        axios.put('http://localhost:5000/api/places/' + params.id, this.state)
        .then(response => {
            console.log(response)
            this.props.history.push("/list")
        }) 
        .catch((err)=>{
            console.log(err)
        })   
    }
    render() {
        return (
            <div>
                <h2>Edit your experience</h2>
                <form onSubmit={this.handleSave}>
                    <label>Título</label>
                    <input 
                        type="text" 
                        name='name' 
                        value={this.state.name}
                        onChange={this.handleChange} />
                    <label>Descripción</label>
                    <input 
                        type="text" 
                        name='description' 
                        value={this.state.description}
                        onChange={this.handleChange} />
                    <input 
                        type="submit" 
                        value='SAVE' />
                </form>
            </div>
        )
    }
}

export default EditPlace
