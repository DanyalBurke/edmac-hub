import fetchRetry from './FetchRetry';

class FeedbackStore {
    sendError(name, message) {
        this.addMessage(name, "error_log", message);
    }

    sendFeedback(name, email, message) {
        fetchRetry('/api/feedback.php', {
            method: 'POST',
            body: JSON.stringify({name: name, email: email, message: message})
        }).then((response) =>
            response.text()
        ).then((response) => {
            console.log(response);
            this.subscribers.forEach((s) => s());
        }).catch((err) =>
            console.log(err)
        );
    }
}

export default FeedbackStore