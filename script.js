var api_Link="https://pokeapi.co/api/v2";
var search_req = new XMLHttpRequest();
var type_req= new XMLHttpRequest();




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
  var weakList= "";
  type_req.onload = function (){
                            var typeData=JSON.parse(this.responseText);
                            console.log(typeData);

                            var z=typeData.damage_relations.double_damage_from.length;
                            var k;

                            for(k=0; k<z; k++){
                              var poke_req=new Array(k)
                              poke_req[k]=new XMLHttpRequest();

                              poke_req[k].open('GET', "https://pokeapi.co/api/v2/type/" + typeData.damage_relations.double_damage_from[k].name + '/',true);
                              var strong_type=typeData.damage_relations.double_damage_from[k].name
                              console.log(strong_type)
                              console.log(poke_req)
                              poke_req[k].onload = function(){
                                                          var pokeData=new Array(k);
                      			                              pokeData[k] = JSON.parse(this.responseText);
                                                           console.log(pokeData[k]);
                      			                               var l;

                      			                               for(l=0; l<pokeData[k].pokemon.length; l++){
                                                                weakList+= '<li class="m-1 rounded list-group-item list-group-item-secondary "><div class="row"><div class="col-10 p-1"><h4>'+ pokeData[k].pokemon[l].pokemon.name.toUpperCase()+'</h1></div>' +'<div class="col-2 p-2">'+pokeData[k].name+'</div></div></li>';
                                                                console.log(weakList)
                                                            }

                                                            document.getElementById("weakness").innerHTML = "Pokemons strong against "+type+" are: <br><br>" + weakList;
                                                            }


                      		   poke_req[k].send();
                           }
                      		   }

    type_req.send();
  }
