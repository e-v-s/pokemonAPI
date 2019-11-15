function filterData(data, condition) {

  for (let i of data) {
    console.log(data)
  }

  // data.map(abi => {
  //   if (abi.ability.name.includes(condition)) {
  //     return data
  //   }
  // })
  // data.abilities.map(type => {
  //   if (type.ability.name === condition) {
  //     return data
  //   }
  // })
  //return data.filter(item => item.data.types.includes(condition));
}



function filterName(data, condition) {
  return data.filter(item => item.name.includes(condition.charAt(0).toUpperCase() + condition.slice(1)));
}

function sortData(data, sortBy, sortOrder) {
  let orderAZ = (a, b) => {
    return a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0;
  };

  if (sortOrder === "ascendingOrder" || sortOrder === "ascendingFilterOrder") {
    return data.sort(orderAZ);
  } else if (sortOrder === "descendingOrder" || sortOrder === "descendingFilterOrder") {
    return data.reverse(data.sort(orderAZ));
  } 
}

function computers(data) {
  return ((data.length * 100) / 151).toFixed(1);
}

window.app = {
  filterData: filterData,
  sortData: sortData,
  computers: computers,
  filterName: filterName,
};