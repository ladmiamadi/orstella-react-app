import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {useDispatch} from "react-redux";
import {addProduct, editProduct, getProducts} from "../actions/product.action";
import axios from "axios";

function AddEdit() {
    const location = useLocation();
    const product = location.state?.data;
    const isAddMode = !product;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] =useState(null);
    const fileSelectedHandler = event => {
        setSelectedFile(event.target.files[0])
    }
    // form validation rules
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Title is required'),
        price: Yup.number()
            .required('Price is required'),
        description: Yup.string()
            .required('Description is required'),
        quantity: Yup.number()
            .required('Quantity is required'),
        image: Yup.mixed()
            .required('Image file is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, formState: { errors }, formState, setValue } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createProduct(data)
            : updateProduct(data);
    }

    async function createProduct(data) {
        if(selectedFile) {
            const dataForm = new FormData()
            dataForm.append('file', selectedFile)
            axios.post("http://localhost:8000/upload", dataForm, {
                // receive two    parameter endpoint url ,form data
            })

                .then(res => { // then print response status
                    console.log(res.statusText)
                })
        }

        const postData = {
            title: data.title,
            price: data.price,
            description: data.description,
            quantity: data.quantity,
            image: selectedFile.name
        }

        await dispatch(addProduct(postData));
        //dispatch(getProducts());
        navigate("/home");
    }

    function updateProduct(data) {
        if(selectedFile !== data.image) {
            const dataForm = new FormData()
            dataForm.append('file', selectedFile)
            axios.post("http://localhost:8000/upload", dataForm, {
                // receive two    parameter endpoint url ,form data
            })

                .then(res => { // then print response status
                    console.log(res.statusText)
                })
        }
        const postData = {
            title: data.title,
            price: data.price,
            description: data.description,
            quantity: data.quantity,
            id: data.id,
            image: selectedFile.name
        }

        dispatch(editProduct(postData));
        dispatch(getProducts());
        navigate("/home");
    }

    useEffect(() => {
        if (!isAddMode) {
            const fields = ['title', 'price', 'description', 'quantity'];
                fields.forEach(field => setValue(field, product[field]));
        }
    }, []);

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)} onReset={reset} className="w-75 mx-auto my-4 post-form p-5 border">
                <h1>{isAddMode ? 'Ajouter un produit' : 'Editer un produit'}</h1>
                {
                    !isAddMode ? <input id="id" name="id" value={product.id} className="d-none" {...register('id', { required: true })}/>:''
                }
                <div className="mb-3">
                    <label>Titre</label>
                    <input name="title" type="text" {...register('title', { required: true })} className={`form-control ${errors.title? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.title?.message}</div>
                </div>
                <div className="mb-3">
                    <label>Prix</label>
                    <input name="price" type="text"{...register('price', { required: true })} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <input name="description" type="text" {...register('description', { required: true })} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
                <div className="mb-3">
                    <label>Quantité</label>
                    <input name="quantity" type="text" {...register('quantity', { required: true })} className={`form-control ${errors.quantity ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.quantity?.message}</div>
                </div>
                <div className="mb-3">
                    <label>Merci de choisir une image</label>
                    <input name="image" type="file"
                           {...register('image', { required: true })}
                           className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                           onChange={fileSelectedHandler}
                    />
                    <div className="invalid-feedback">{errors.image?.message}</div>
                </div>
                <div className="form-group">
                    <button type="Ajouter" disabled={formState.isSubmitting} className="btn btn-success">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Enregistrer
                    </button>
                    <Link to="/home" className="btn btn-warning mx-4">Retour</Link>
                </div>
            </form>
        </div>

    );
}

export { AddEdit };