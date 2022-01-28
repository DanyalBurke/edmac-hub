import fetchRetry from './FetchRetry';

class MessagesStore {
    subscribers = [];

    getMessages() {
        return fetchRetry('/api/messages.php', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).catch((err) =>
            console.log(err.message)
        );
    }

    addMessage(name, message) {
        fetchRetry('/api/messages.php', {
            method: 'POST',
            body: JSON.stringify({name: name, message: message})
        }).then((response) =>
            response.text()
        ).then((response) => {
            console.log(response);
            this.subscribers.forEach((s) => s());
        }).catch((err) =>
            console.log(err.message)
        );
    }

    subscribe(f) {
        this.subscribers.push(f);
    }

    unsubscribe(f) {
        this.subscribers = this.subscribers.filter(item => item !== f)
    }
}

export default MessagesStore