import React, {Component} from 'react'
import Bouton from '../Bouton/Bouton'
import {withFormik} from "formik"
import * as Yup from "yup"

class Form extends Component{
    render(){
        return (
            <>
                <form className='form-group'>
                    <fieldset>
                        <legend className='text-center text-dark'>Affichage du formulaire d'ajout</legend>
                        <div className="form-group">
                            <label>Titre : 
                                <input type="text" name="titre" className="form-control" value={this.props.values.titre} onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
                            </label>
                        </div>
                        {this.props.touched.titre && this.props.errors.titre 
                        && <span style={{color : "red"}}>{this.props.errors.titre}</span>}
                        <div className="form-group">
                            <label>Auteur : 
                                <input type="text" name="auteur" className="form-control" value={this.props.values.auteur} onChange={this.props.handleChange} onBlur={this.props.handleBlur} />
                            </label>
                        </div>
                        {this.props.touched.auteur && this.props.errors.auteur && <span style={{color : "red"}}>{this.props.errors.auteur}</span>}
                        <div className="form-group">
                            <label>Numero de pages :
                                <input type="number" name="nbPages" className="form-control" value={this.props.values.nbPages} onChange={(event)=>{this.props.setFieldValue('nbPages', +event.target.value)}} onBlur={this.props.handleBlur} />
                            </label>
                        </div>
                        {this.props.touched.nbPages && this.props.errors.nbPages && <span style={{color : "red"}}>{this.props.errors.nbPages}</span>}
                        <br />
                        <Bouton type="button" typeBtn="btn-primary my-3" clic={this.props.handleSubmit}>Valider</Bouton>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default withFormik({
    mapPropsToValues : () => ({
        titre : '',
        auteur : '',
        nbPages : ''
    }),
    validationSchema : Yup.object().shape({
        titre : Yup.string()
                    .min(3, 'Le titre doit avoir plus de 3 carctères')
                    .max(15, "Le titre doit avoir moins de 15 caractères")
                    .required("Le titre est obligatoire"),
        auteur : Yup.string()
                    .min(3, 'L \'auteur doit avoir plus de 3 carctères')
                    .required("Le titre est obligatoire"),
        nbPages : Yup.number()
                    .lessThan(1000, "Nombre de pages superieur à 1000")
                    .moreThan(1000, "Nombre de pages inferieur à 50")
        
    }),
    // validate : values => {
    //     const errors = {}
    //     if(values.titre.length<3){
    //         errors.titre = "Le titre doit avoir plus de trois caractères"
    //     }
    //     if(values.titre.length>15){
    //         errors.titre = "Le titre doit avoir moins de 15 caractères"
    //     }
    //     if(!values.auteur){
    //         errors.auteur = "Le champs auteur est obligatoire"
    //     }
    //     return errors
    // },
    handleSubmit : (values, {props}) => {
        props.validation(values.titre, values.auteur, values.nbPages)
    }
})(Form)






