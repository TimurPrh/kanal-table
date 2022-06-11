const fetchList = async (page, limit, sort, filter) => {
  page = page || 1
  limit = limit || 3

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/table-items?limit=${limit}&page=${page}&sort=${JSON.stringify(sort)}&filter=${JSON.stringify(filter)}`)
    const data = await res.json()

    return await data
  } catch (e) {
    console.log(e)
  }
}

const fetchListItemsCount = async (filter) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/items-count?filter=${JSON.stringify(filter)}`)
    const data = await res.json()

    return await data
  } catch (e) {
    console.log(e)
  }
}

export {
  fetchList,
  fetchListItemsCount
}