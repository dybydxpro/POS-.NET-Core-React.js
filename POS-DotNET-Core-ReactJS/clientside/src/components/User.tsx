

export default function User(){
    return(
        <>
            <div className="row">
                <p className="m-4" style={{ color: "#4d646f", fontSize: "18px", fontWeight: "600" }}>Users</p>
            </div>

            <div className="row mx-3">
                <div className="row">
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="form-floating" style={{ minWidth: "300px" }}>
                                <input className="form-control" type="text" id="txtSearch" placeholder="Search"/>
                                <label htmlFor="txtSearch" className="form-label"><i className="bi bi-search text-secondary" /></label>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}