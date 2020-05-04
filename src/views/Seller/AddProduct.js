import React from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import { fbDatabase, fbAuth } from "../services/firebase.conf";

class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      foto: '',
      peso_unidade: '',

      error: {},
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(e) {
    let data = e.target.value;
    console.log(e.target)
    
    // if (e.target.id === "cep") {
    //   this.setState({ cep: mask.cepMask(data) });
    // } else if (e.target.id === "phone") {
    //   this.setState({ phone: mask.phoneMask(data) });
    // } else if (e.target.id === "cnpj") {
      //   this.setState({ cnpj: mask.cnpjMask(data) });
      // } else {
      this.setState({ [e.target.id]: data });
      // }
      console.log(this.state)
  }
  
  cancel(e) {
    window.location.replace("/admin/seller");
  }

  render() {
    const {
      nome,
      foto, 
      peso_unidade,
      error,
      loading
    } = this.state;
    return (
      <div>
        <div className="form">
            <form>
              <div>
                <TextField
                  label="Nome"
                  id="nome"
                  margin="normal"
                  value={nome}
                  onChange={this.handleChange}
                  disabled={loading}
                  error={error.nome}
                  required
                />
              </div>
              <div>
              <label>
                Foto:
                <input type="file" value={foto} onChange={this.handleChange}/>
              </label>
              </div>
              <div>
                <InputLabel id="labelpeso_unidade">Peso/Unidade</InputLabel>
                <Select
                  labelId="labelpeso_unidade"
                  id="peso_unidade"
                  value={peso_unidade}
                  onChange={this.handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Peso</MenuItem>
                  <MenuItem value={2}>Unidade</MenuItem>
                </Select>
              </div>
              
            </form>

            {loading ?
              <CircularProgress/>
            :
              <div className="buttons">
                <Button className="button" variant="outlined" size="small" color="primary" onClick={this.cancel}>
                  Cancelar
                </Button>
                <Button className="button" variant="contained" size="small" color="primary" onClick={this.createStore}>
                  Cadastrar
                </Button>
              </div>
              
            }
        </div>
      </div>
    );
  }
}

export default AddProduct;