import React, { ChangeEvent } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { answer } from './Play'
import { qIndex, questions } from '@/utils/misc'

interface QuestionAnswerSectionProps {
    disableStartButton: boolean
    showReset: boolean
    handleAnswerChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleStart: () => void
    handleContinue: () => void
}

const QuestionAnswerSection: React.FC<QuestionAnswerSectionProps> = ({
    disableStartButton,
    showReset,
    handleAnswerChange,
    handleStart,
    handleContinue
}) => {
    const { question } = questions.value[qIndex.value]
    return (
        <Box sx={{ textAlign: 'center', my: 2 }}>
            <Typography>Spørsmål</Typography>
            <Typography variant='h5'>{question}</Typography>
            <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
                <TextField
                    onChange={handleAnswerChange}
                    value={answer.value}
                    autoComplete='off'
                    autoFocus
                    disabled={disableStartButton}
                    sx={{
                        caretColor: 'transparent'
                    }}
                />
                <Box>
                    {showReset ? (
                        <Button
                            variant='contained'
                            color='success'
                            onClick={handleContinue}
                        >
                            Fortsett
                        </Button>
                    ) : (
                        <Button
                            variant='contained'
                            onClick={handleStart}
                            disabled={disableStartButton}
                            sx={{ width: 100, mb: 3 }}
                        >
                            Start
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default QuestionAnswerSection
