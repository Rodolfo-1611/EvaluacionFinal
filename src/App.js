import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function App() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [nivel, setNivel] = useState();
  const [ataqueBasico, setAtaqueBasico] = useState("");
  const [ataqueCargado, setAtaqueCargado] = useState("");

  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);

  const [pokemonesList, setPokemones] = useState([]);

  const add = () => {
    fetch("http://localhost:3001/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        tipo: tipo,
        nivel: nivel,
        ataqueBasico: ataqueBasico,
        ataqueCargado: ataqueCargado,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        return response.text();
      })
      .then((data) => {
        getPokemones();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Registro exitoso</strong>",
          html:
            "<i>El pokemon <strong>" +
            nombre +
            "</strong> fue registrado con exito</i>",
          icon: "success",
          timer: 3000,
        });
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error("Error al registrar el Pokémon:", error);
        alert("Hubo un error al registrar el Pokémon");
      });
  };

  const update = () => {
    fetch("http://localhost:3001/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        nombre: nombre,
        tipo: tipo,
        nivel: nivel,
        ataqueBasico: ataqueBasico,
        ataqueCargado: ataqueCargado,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        return response.text();
      })
      .then((data) => {
        getPokemones();
        limpiarCampos();
        Swal.fire({
          title: "<strong>Actualizacion exitosa</strong>",
          html:
            "<i>El pokemon <strong>" +
            nombre +
            "</strong> fue actualizado con exito</i>",
          icon: "success",
          timer: 3000,
        });
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error("Error al actualizar el Pokémon:", error);
        alert("Hubo un error al actualizar el Pokémon");
      });
  };

  const deletePoke = (val) => {
    Swal.fire({
      title: "¿Confirmar eliminado?",
      html:
        "<i>¡Realmente desea eliminar a <strong>" +
        val.nombre +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/delete/${val.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error en la petición");
            }
            return response.text();
          })
          .then((data) => {
            getPokemones();
            limpiarCampos();

            Swal.fire({
              title: "Eliminado!",
              text: val.nombre + " fue eliminado",
              icon: "success",
              timer: 3000
            });

            console.log("Respuesta del servidor:", data);
          })
          .catch((error) => {
            console.error("Error al eliminar el Pokémon:", error);
            alert("Hubo un error al eliminar el Pokémon");
          });
      }
    });
  };

  const limpiarCampos = () => {
    setNombre("");
    setTipo("");
    setNivel("");
    setAtaqueBasico("");
    setAtaqueCargado("");
    setEditar(false);
  };

  const editarPokemon = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setTipo(val.tipo);
    setNivel(val.nivel);
    setAtaqueBasico(val.ataque_basico);
    setAtaqueCargado(val.ataque_cargado);

    setId(val.id);
  };

  const getPokemones = () => {
    fetch("http://localhost:3001/pokemones")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar los pokemones");
        }
        return response.json();
      })
      .then((data) => {
        setPokemones(data);
      })
      .catch((error) => {
        console.error("Error en la petición:", error);
      });
  };

  getPokemones();

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTION DE POKEMONES</div> 
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={nombre}
              placeholder="Ingrese un nombre Pokemon"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Tipo:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setTipo(event.target.value);
              }}
              className="form-control"
              value={tipo}
              placeholder="Ingrese su tipo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nivel:
            </span>
            <input
              type="number"
              onChange={(event) => {
                setNivel(event.target.value);
              }}
              className="form-control"
              value={nivel}
              placeholder="Ingrese el nivel"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Ataque Basico:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setAtaqueBasico(event.target.value);
              }}
              className="form-control"
              value={ataqueBasico}
              placeholder="Ingrese el ataque básico"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Ataque cargado:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setAtaqueCargado(event.target.value);
              }}
              className="form-control"
              value={ataqueCargado}
              placeholder="Ingrese el ataque cargado"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar Pokemon
              </button>
              <button className="btn btn-info m-2" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar Pokemon
            </button>
          )}
        </div>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Tipo</th>
            <th scope="col">Nivel</th>
            <th scope="col">Ataque Basico</th>
            <th scope="col">Ataque Cargado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pokemonesList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.tipo}</td>
                <td>{val.nivel}</td>
                <td>{val.ataque_basico}</td>
                <td>{val.ataque_cargado}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarPokemon(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deletePoke(val);
                      }}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
