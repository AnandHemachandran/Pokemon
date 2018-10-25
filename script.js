var api_Link="https://pokeapi.co/api/v2";
var search_req = new XMLHttpRequest();
var type_req = new XMLHttpRequest();
var poke_req=new XMLHttpRequest();



function search_Pokemon(){

  var search = document.getElementById("Pokemon_name").value;

  search_req.open('GET', "https://pokeapi.co/api/v2/pokemon/"+search.toLowerCase()+'/',true)

  search_req.onload = function (){
                            var data=JSON.parse(this.responseText);
                            console.log(data);


                            var Name=data.name.toUpperCase();
                            document.getElementById("name").innerHTML =Name;

                            //////////////////////////////////////////////////////////////

                            document.getElementById("img").innerHTML = '<img style="width: 200px;" src="' + data.sprites.front_default + '">';

                            //////////////////////////////////////////////////////////////

                            var x=data.abilities.length;
                            var abilityList = "";
                            var i;

                            for (i = 0; i < x; i++) {
                                abilityList += '<li>' + data.abilities[i].ability.name + '</li>';
                                }

                            document.getElementById("ability").innerHTML = "Abilities are: <br>" + abilityList;

                            ////////////////////////////////////////////////////////////////

                            var y=data.types.length;
                            var typeList= "";
                            var j;

                            for (j = 0; j < y; j++) {
                              typeList+= '<li>' + data.types[j].type.name + '</li>';
                                }

                            document.getElementById("type").innerHTML = "Pokemon types are: <br>" + typeList;

                          }
  search_req.send();

}





function weak_Against(){

  var type = document.getElementById("Weaktype").value;
  type_req.open('GET', "https://pokeapi.co/api/v2/type/"+type.toLowerCase()+'/',true)

  type_req.onload = function (){
                            var typeData=JSON.parse(this.responseText);
                            console.log(typeData);

                            var z=typeData.damage_relations.double_damage_from.length;
                            var k;
                            for(k=0; k<z; k++){

                              poke_req.open('GET', "https://pokeapi.co/api/v2/type/" + typeData.damage_relations.double_damage_from[k].name + '/',true);
                              poke_req.onload = function(){
                      			                               var pokeData = JSON.parse(this.responseText);
                                                           console.log(pokeData);
                      			                               var l;
                                                           var weakList= "";
                      			                               for(l=0; l<pokeData.pokemon.length; l++){
                                                                weakList+= '<li class="m=3 list-group-item list-group-item-secondary ">' + pokeData.pokemon[l].pokemon.name + '</li>';
                                                            }

                                                            document.getElementById("weakness").innerHTML = "Pokemons strong against "+type+" are: <br><br>" + weakList;
                                                            }

                      		                      }
                      		   poke_req.send();
                      		   }

    type_req.send();
  }
