function notAuth(session:any){
    const notPermitted = session.active !== 2 || session.role === 'guest'
    if (notPermitted){
        return true
    }else{
        return false
    }
}

export default notAuth;