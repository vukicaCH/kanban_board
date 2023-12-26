

export const useHelper = () => {
    
    const find = (items, id) => {
        return items.find(item => item.id == id)
    }

    const filter = (items, id) => {
        return items.filter(item => item.id != id)
    }

    const sortBy = (items, property) =>{
        return items.sort( (a,b) => a[property] < b[property] ? -1 : 1);
    }

    const replace = (items, newItem) =>{

        const newItems = filter(items, newItem.id);
        newItems.push(newItem);

        return sortBy(newItems, 'id');
    }

    return {
        find,
        filter,
        sortBy,
        replace
    }
}