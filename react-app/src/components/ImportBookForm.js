import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/ImportBook";
import { useToasts } from "react-toast-notifications";


const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    BookName: '',
    Sasia: '',
    authorName: '',
    DataBotimit: '',
    Zhanra: '',
}

const ImportBookForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('BookName' in fieldValues)
            temp.BookName = fieldValues.BookName ? "" : "This field is required."
        if ('Sasia' in fieldValues)
            temp.Sasia = fieldValues.Sasia ? "" : "This field is required."
        if ('Zhanra' in fieldValues)
            temp.Zhanra = fieldValues.Zhanra ? "" : "This field is required."
        if ('authorName' in fieldValues)
            temp.authorName = fieldValues.authorName ? "" : "This is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createImportBook(values, onSuccess)
            else
                props.updateImportBook(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.ImportBookList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <h1>Shto Librin</h1>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="BookName"
                        variant="outlined"
                        label="Book Name"
                        value={values.BookName}
                        onChange={handleInputChange}
                        {...(errors.BookName && { error: true, helperText: errors.BookName })}
                    />
                    <TextField
                        name="authorName"
                        variant="outlined"
                        label="Emri i Autorit"
                        value={values.authorName}
                        onChange={handleInputChange}
                        {...(errors.authorName && { error: true, helperText: errors.authorName })}
                    />
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.Zhanra && { error: true })}
                    >
                        <InputLabel ref={inputLabel}> Zhanra</InputLabel>
                        <Select
                            name="Zhanra"
                            value={values.Zhanra}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Selekto Zhanren </MenuItem>
                            <MenuItem value="Action and Adventure">Action and Adventure</MenuItem>
                            <MenuItem value="Classics">Classics</MenuItem>
                            <MenuItem value="Graphic Novel">Graphic Novel</MenuItem>
                            <MenuItem value="Fantasy">Fantasy</MenuItem>
                            <MenuItem value="Historical Fiction">Historical Fiction</MenuItem>
                            <MenuItem value="Horror">Horror</MenuItem>
                            <MenuItem value="Literary Fiction">Literary Fiction</MenuItem>
                        </Select>
                        {errors.Zhanra && <FormHelperText>{errors.Zhanra}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>

                    <TextField
                        name="Sasia"
                        variant="outlined"
                        label="Sasia"
                        value={values.Sasia}
                        onChange={handleInputChange}
                        {...(errors.Sasia && { error: true, helperText: errors.Sasia })}
                    />
                    <TextField
                        name="DataBotimit"
                        variant="outlined"
                        label="Data e Botimit"
                        value={values.DataBotimit}
                        onChange={handleInputChange}
                    />
                    
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    ImportBookList: state.ImportBook.list
})

const mapActionToProps = {
    createImportBook: actions.create,
    updateImportBook: actions.update
}


export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(ImportBookForm));