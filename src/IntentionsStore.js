import fetchRetry from './FetchRetry';


class IntentionsStore {
    subscribers = [];

    getIntentions() {
        return fetchRetry('/api/intentions.php', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).catch((err) => {
            console.log(err);
        });
    }

    addIntention(name, time, date, parkingSpace) {
        fetchRetry('/api/intentions.php', {
            method: 'POST',
            body: JSON.stringify({name: name, visitTime: time, visitDate: date, parkingSpace: parkingSpace})
        }).then((response) =>
            response.text()
        ).then((response) => {
            console.log(response);
            this.subscribers.forEach((s) => s());
        }).catch((err) => {
            console.log(err);
            if(name === "Debug") {
                alert(JSON.stringify(err));
            }
        });
    }

    removeIntention(name, visitDate) {
        fetchRetry('/api/intentions.php', {
            method: 'DELETE',
            body: JSON.stringify({name: name, visitDate: visitDate})
        }).then((response) =>
            response.text()
        ).then((response) => {
            console.log(response);
            this.subscribers.forEach((s) => s());
        }).catch((err) => {
            console.log(err);
            if(name === "Debug") {
                alert(JSON.stringify(err));
            }
        });
    }

    subscribe(f) {
        this.subscribers.push(f);
    }
}

export default IntentionsStore