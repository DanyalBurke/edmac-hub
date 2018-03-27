import fetchRetry from './FetchRetry';

class VisitorsStore {
    getVisitors() {
        return fetchRetry('/api/visitors.php', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).catch((err) =>
            console.log(err)
        );
    }

    addVisitor(name) {
        fetchRetry('/api/visitors.php', {
            method: 'POST',
            body: JSON.stringify({name: name})
        }).then((response) =>
            response.text()
        ).then((response) => {
            console.log(response);
        }).catch((err) =>
            console.log(err)
        );
    }
}

export default VisitorsStore