export const handleDelete = async (p_id, p_deleteFun, p_fetchFun) => {
    const isConfirmed = window.confirm("Sicuro di voler eliminare il contenuto?");
    if (isConfirmed) {
        await p_deleteFun(p_id)
        p_fetchFun()
    } 
}