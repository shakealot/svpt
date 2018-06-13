import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './vainqueur.css';
import AvatarMini from './AvatarMini';

export default class Vainqueur2 extends Component {

  render() {
    const data = [];
    this.props.tournois.forEach( (tournoi) => {
      tournoi.premier = getPremier(tournoi);
      tournoi.resultat.forEach( (resultat) => {
        resultat.joueur = resultat.joueur.pseudo
        let joueur = data.find( (joueur) => {
          return joueur.joueur === resultat.joueur;
        });
        if(joueur) {
          joueur.buyIn += resultat.buyIn;
          joueur.gainBrut += resultat.gainBrut;
          joueur.gainNet += resultat.gainBrut - resultat.buyIn;
          joueur.nbrJouees += 1;
          if(joueur.joueur === tournoi.premier) {
            joueur.nbrGagnees += 1;
          }
        }
        else {
          data.push({
            joueur: resultat.joueur,
            buyIn: resultat.buyIn,
            gainBrut: resultat.gainBrut,
            gainNet: resultat.gainBrut - resultat.buyIn,
            nbrJouees: 1,
            nbrGagnees: (resultat.joueur === tournoi.premier) ? 1 : 0,
          });
        }
      });
    });

    // Données calculées
    data.forEach( (joueur) => {
      joueur.roi = (100/joueur.buyIn) * joueur.gainNet;
    });

    return (
      <div>
          <ReactTable
            data={data}
            columns={columns}
            resizable={false}
            minRows="0"
            showPagination={false}
            defaultSorted={[
              {
                id: "gainBrut"
              }
            ]}
          />
      </div>
    )
  }

}

const columns = [{
  id: 'Joueur',
  Header: 'Joueur',
  accessor: d => d.joueur,
  Cell: row => (
    <div>
      <AvatarMini joueur={row.value} width="30" height="30"/> {row.value}
    </div>
  )
}, {
  id: 'roi',
  Header: 'ROI',
  accessor: joueur => Math.round(joueur.roi),
  sortMethod: inverseSort
},{
  Header: 'Gain net',
  accessor: 'gainNet',
  sortMethod: inverseSort
},{
  Header: 'Victoires',
  accessor: 'nbrGagnees',
  sortMethod: inverseSort
},{
  Header: 'Tournois',
  accessor: 'nbrJouees',
  sortMethod: inverseSort
},{
  Header: 'Gain brut',
  accessor: 'gainBrut',
  sortMethod: inverseSort
},{
  Header: 'Buy-in',
  accessor: 'buyIn',
  sortMethod: inverseSort
}];


function getPremier(tournoi) {
  var joueurs = tournoi.resultat.slice();
  joueurs.sort( (a,b) => {
    return (a.gainBrut > b.gainBrut) ?
      -1 :
      ((b.gainBrut > a.gainBrut) ?
        1 :
        0)
  });
  return joueurs[0].joueur.pseudo;
}


// function getPremierROI(joueurs) {
//   var joueurs2 = joueurs.slice();
//   joueurs2.sort( (a,b) => {
//     return (a.roi > b.roi) ?
//       -1 :
//       ((b.roi > a.roi) ?
//         1 :
//         0)
//   });
//   return joueurs2[0];
// }


function inverseSort(a, b, desc) {
  // force null and undefined to the bottom
  a = a === null || a === undefined ? -Infinity : a;
  b = b === null || b === undefined ? -Infinity : b;
  // force any string values to lowercase
  a = typeof a === "string" ? a.toLowerCase() : a;
  b = typeof b === "string" ? b.toLowerCase() : b;
  // Return either 1 or -1 to indicate a sort priority
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
  return 0;
}
