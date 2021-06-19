import React from 'react';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'

const PhotoForm = props => {
    return (
        <div>
            <FormControl>
                <FormLabel>Manage Gallery</FormLabel>
                
                <FormHelperText></FormHelperText>
            </FormControl>
        </div>
    );
};

export default PhotoForm;