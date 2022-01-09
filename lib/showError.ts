export function showError (status:any){
    if (process.env.NODE_ENV !== 'production'){
        console.log(status);
    }
}