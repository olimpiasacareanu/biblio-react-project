import React, {Component} from 'react'
import Livre from './Livre/Livre'
import Form from '../../components/Form/Form'
import ModificationForm from '../../components/ModificationForm/ModificationForm'
import MsgAlert from '../../components/MsgAlert/MsgAlert'

class Livres extends Component{
    state = {
        livres : [
            {id : 1, titre : "Mizerabilii", auteur : "Victor HUGO", nbPages : 200},
            {id : 2, titre : "Nunta in cer", auteur : "Mircea Eliade", nbPages : 200},
            {id : 3, titre : "Luceafarul", auteur : "Mihai EMINESCU", nbPages : 200}
        ],
        lastIdLivre : 3,
        idLivreAModifier : 0,
        msgAlert : null
    }

    handleAjoutLivre = (titre, auteur, nbPages)=>{
        let newTabLivres = [...this.state.livres]
        newTabLivres.push({id:this.state.lastIdLivre+1, titre : titre, auteur : auteur, nbPages : nbPages})
        this.setState(oldState=>{
            return{
                livres: newTabLivres, 
                lastIdLivre : oldState.lastIdLivre+1,
                msgAlert : {
                    message : "Ajout efectuée ! ",
                    type : "alert-primary"
                }
            }
        })
        this.props.fermerAjoutLivre()
    }

    handleModificationLivre = (id, titre, auteur, nbPages)=>{
        let livreIndexTab = this.state.livres.findIndex(livre=> {
            return livre.id === id
        })
        let newTabLivres = [...this.state.livres]
        newTabLivres.splice(livreIndexTab, 1, {id : id, titre: titre, auteur : auteur, nbPages : nbPages})
        // option 2
        // newTabLivres[livreIndexTab] = {id : id, titre: titre, auteur : auteur, nbPages : nbPages}
        this.setState({livres : newTabLivres, 
            idLivreAModifier : 0,    
            msgAlert : {
                message : "Modification efectuée ! ",
                type : "alert-primary"
            } 
        })
    }

    handleSuppressionLivre = (id)=>{
        let livreIndexTab = this.state.livres.findIndex(livre=> {
            return livre.id === id
        })
        let newTabLivres = [...this.state.livres]
        newTabLivres.splice(livreIndexTab, 1)
        console.log(newTabLivres)
        console.log(this.state.livres)
        this.setState({
            livres : newTabLivres,
            msgAlert : {
                message : "Suppression efectuée ! ",
                type : "alert-danger"
            }
        })
    }
    
    render(){
        return (
            <>
                {this.state.msgAlert && <MsgAlert typeAlert={this.state.msgAlert.type}>{this.state.msgAlert.message}</MsgAlert>}
                <table className="table text-center">
                <thead>
                    <tr className="table-dark ">
                        <th scope="col">Titre</th>
                        <th scope="col">Auteur</th>
                        <th scope="col">Nombre de pages</th>
                        <th scope="col" colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>             
                    {
                        this.state.livres.map(livre => {
                            if(livre.id !== this.state.idLivreAModifier){
                                return (
                                    <tr key={livre.id}>
                                        <Livre  
                                            titre = {livre.titre}
                                            auteur = {livre.auteur}
                                            nbPages = {livre.nbPages}
                                            modification = {()=>this.setState({idLivreAModifier : livre.id})}
                                            suppression = {()=>this.handleSuppressionLivre(livre.id)}
                                        />
                                    </tr>
                                )
                            } else {
                                return (
                                    <tr key={livre.id}>
                                        <ModificationForm 
                                            id = {livre.id}
                                            titre = {livre.titre}
                                            auteur = {livre.auteur}
                                            nbPages = {livre.nbPages}
                                            validationModification = {this.handleModificationLivre}
                                        />
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
                </table>
                <div className='container form ' >
                    {this.props.ajoutLivre &&  <Form validation={this.handleAjoutLivre } />}
                </div>
            </>
        )
    }
}

export default Livres

